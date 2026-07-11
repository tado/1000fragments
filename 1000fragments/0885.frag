uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.17 - t * 4.29 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.28, vec3(0.48, 0.48, 0.57), vec3(0.41, 0.37, 0.40), vec3(0.95, 0.88, 1.00), vec3(0.24, 0.89, 0.63));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
