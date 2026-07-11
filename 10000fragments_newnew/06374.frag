uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.14 + t * 2.60 + ph) + sin(p.y * 6.09 - t * 2.60 + ph)
        + sin((p.x + p.y) * 3.93 + t * 2.60 + ph) + sin(length(p) * 17.09 - t * 2.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.14, vec3(0.49, 0.45, 0.57), vec3(0.31, 0.39, 0.34), vec3(1.03, 1.04, 1.37), vec3(0.08, 0.57, 0.12));
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
