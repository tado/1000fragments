uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.22 + t * 1.67 + ph) + sin(p.y * 8.25 - t * 1.67 + ph)
        + sin((p.x + p.y) * 6.46 + t * 1.67 + ph) + sin(length(p) * 15.41 - t * 1.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.18;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 4.41 - time * 0.57); }
	p = fract(p * 2.30) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.03, vec3(0.54, 0.58, 0.48), vec3(0.47, 0.33, 0.41), vec3(1.29, 0.90, 1.32), vec3(0.76, 0.20, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
