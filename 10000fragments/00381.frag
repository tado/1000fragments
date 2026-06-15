uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.97 + sin(p.y * 1.54 + t * 4.47) * 4.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.90 + sin(p.y * 1.30 + t * 2.56) * 1.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.27);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.61 + time * 0.19, vec3(0.56, 0.50, 0.49), vec3(0.34, 0.32, 0.32), vec3(1.22, 1.22, 0.74), vec3(0.53, 0.58, 0.90));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
