uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.70 + t * 1.56 + ph) + sin(p.y * 2.69 - t * 1.56 + ph)
        + sin((p.x + p.y) * 3.09 + t * 1.56 + ph) + sin(length(p) * 4.32 - t * 1.56 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.54 + vec2(t * 0.60, -t * 0.60) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p = rot2(length(p) * -3.53 + time * 1.18) * p;
	p += vec2(0.20, -0.40) * sin(length(p) * 5.91 - time * 0.54) * 0.21;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.71 + time * 0.26, vec3(0.43, 0.58, 0.52), vec3(0.49, 0.48, 0.40), vec3(1.30, 1.38, 1.22), vec3(0.35, 0.73, 0.57));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
