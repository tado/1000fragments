uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.33 + t * 2.55 + ph) + sin(p.y * 17.19 - t * 5.06 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p = abs(p) - 0.21;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.26, vec3(0.52, 0.42, 0.54), vec3(0.48, 0.30, 0.41), vec3(1.04, 0.90, 1.38), vec3(0.01, 0.09, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
