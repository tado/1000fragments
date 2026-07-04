uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.45 - t * 1.90;
    v = sin(floor(lv * 3.7) / 3.7 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.51);
    float gsh = hash21(vec2(grow, floor(t * 7.77))) - 0.5;
    float gx = p.x + gsh * 0.74;
    v = sin(gx * 10.67 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.25));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * -1.04 + time * 1.23) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.22);
	float d = max(d1, d2);
	vec3 col = vec3(0.48, 0.89, 0.40) * (0.13 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
