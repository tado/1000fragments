uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.22;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.58; kp = rot2(0.97) * kp; kp *= 1.23; }
    v = sin(kp.x * 1.99 - t * 1.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.05) * p * 15.60;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = palette(d * 0.50 + time * 0.15, vec3(0.57, 0.59, 0.42), vec3(0.49, 0.35, 0.32), vec3(1.11, 1.19, 0.92), vec3(0.54, 0.04, 0.31)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
