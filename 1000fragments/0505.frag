uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.81 - t * 2.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.17, vec3(0.47, 0.56, 0.54), vec3(0.50, 0.42, 0.48), vec3(0.84, 0.71, 0.73), vec3(0.82, 0.12, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
