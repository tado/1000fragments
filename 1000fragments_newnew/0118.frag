uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.54 - t * 0.39;
    v = sin(floor(lv * 4.4) / 4.4 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.93 + sr * 12.66 - t * 3.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, (time * 0.66), 0.0);
	float d2 = fieldB(q2, (time * 0.66), 1.05);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.79 + (time * 0.66) * 0.14, vec3(0.49, 0.46, 0.46), vec3(0.18, 0.26, 0.18), vec3(0.44, 0.45, 0.64), vec3(0.65, 0.51, 0.31));
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.970, 1.022) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
