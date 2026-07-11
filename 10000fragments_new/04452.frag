uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.10);
    float gsh = hash21(vec2(grow, floor(t * 2.01))) - 0.5;
    float gx = p.x + gsh * 0.42;
    v = sin(gx * 11.76 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.87));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.71 + jf * 4.0), cos(t * 0.22 * jf)) * 0.39;
        xs += sin(length(p - im) * 219.16 - t * 13.82 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.00));
	vec3 col = vec3(0.83, 0.80, 0.41) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
