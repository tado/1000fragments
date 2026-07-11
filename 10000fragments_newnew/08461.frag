uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.39;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.38 - t * 5.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.38) * p * 21.25;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.93 + time * 0.01, vec3(0.49, 0.49, 0.50), vec3(0.31, 0.31, 0.41), vec3(1.00, 1.27, 1.21), vec3(1.00, 0.01, 0.46)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
