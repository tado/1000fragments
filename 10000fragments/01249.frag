uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.65 + t * 1.50 + ph) + sin(p.y * 11.68 - t * 1.50 + ph)
        + sin((p.x + p.y) * 7.99 + t * 1.50 + ph) + sin(length(p) * 11.86 - t * 1.50 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 3.99 + time * 0.99) * p;
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 3.15 - time * 0.73); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.17, vec3(0.53, 0.59, 0.57), vec3(0.42, 0.37, 0.31), vec3(0.79, 1.35, 1.02), vec3(0.53, 0.57, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
