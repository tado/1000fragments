uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.39 + jf * 4.0), cos(t * 0.25 * jf)) * 0.42;
        xs += sin(length(p - im) * 152.44 - t * 4.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.15);
    float gsh = hash21(vec2(grow, floor(t * 3.75))) - 0.5;
    float gx = p.x + gsh * 1.13;
    v = sin(gx * 8.13 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.47));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 6.91 + time * 2.34) * 0.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.73);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.30 + time * 0.27, vec3(0.44, 0.45, 0.58), vec3(0.49, 0.47, 0.39), vec3(1.19, 1.32, 1.05), vec3(0.73, 0.24, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
