uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.23 + sin(p.y * 2.15 + t * 5.51) * 4.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.23, vec3(0.44, 0.42, 0.45), vec3(0.36, 0.38, 0.40), vec3(0.87, 1.01, 1.08), vec3(0.05, 0.87, 0.44));
	col = mod(col * 2.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
