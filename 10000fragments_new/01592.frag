uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.72 + t * 1.05 + ph) + sin(p.y * 3.27 - t * 1.05 + ph)
        + sin((p.x + p.y) * 11.31 + t * 1.05 + ph) + sin(length(p) * 16.02 - t * 1.05 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.34 + time * 0.39) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.08, vec3(0.59, 0.57, 0.52), vec3(0.38, 0.37, 0.32), vec3(0.98, 1.11, 0.91), vec3(0.40, 0.61, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
