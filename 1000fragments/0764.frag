uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.84 + sin(p.y * 3.39 + t * 2.42) * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	p = fract(p * 2.32) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.24, vec3(0.55, 0.44, 0.42), vec3(0.32, 0.36, 0.45), vec3(1.12, 0.95, 0.75), vec3(0.53, 0.42, 0.70));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
