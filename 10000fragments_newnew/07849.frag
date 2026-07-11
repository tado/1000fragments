uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.88;
    v = 0.5 * (sin(2.0 * cp.x + t * 0.84) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 0.51) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.51) * p * 18.60;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.46 + time * 0.04, vec3(0.48, 0.43, 0.57), vec3(0.34, 0.34, 0.37), vec3(1.35, 0.93, 1.14), vec3(0.10, 0.77, 0.88)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
