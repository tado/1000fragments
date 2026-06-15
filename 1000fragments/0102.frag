uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.94 - t * 2.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.87, 0.75) * sin(length(p) * 3.89 - time * 1.62) * 0.10;
	p *= 2.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.00, vec3(0.58, 0.45, 0.41), vec3(0.41, 0.50, 0.43), vec3(1.38, 1.06, 0.99), vec3(0.01, 0.93, 0.31));
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
