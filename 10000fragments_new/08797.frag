uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.19);
    float gsh = hash21(vec2(grow, floor(t * 6.06))) - 0.5;
    float gx = p.x + gsh * 0.51;
    v = sin(gx * 17.10 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.58));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.42 * jf)) * 0.36;
        xs += sin(length(p - im) * 218.48 - t * 9.34 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.64, 1.31, 1.40) + vec3(0.17, 0.20, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
