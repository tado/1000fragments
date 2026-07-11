uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.02 - t * 6.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.03, vec3(0.52, 0.43, 0.48), vec3(0.50, 0.49, 0.37), vec3(1.39, 1.02, 0.98), vec3(0.22, 0.89, 0.42));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
