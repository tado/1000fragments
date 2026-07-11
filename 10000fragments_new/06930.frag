uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.53 + sin(p.y * 2.06 + t * 3.98) * 2.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.04 + sin(p.y * 1.92 + t * 2.57) * 1.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.64 + time * 0.21, vec3(0.44, 0.42, 0.59), vec3(0.32, 0.34, 0.38), vec3(1.00, 0.81, 1.26), vec3(0.61, 0.58, 0.09));
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
