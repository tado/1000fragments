uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.27 - t * 7.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	p = abs(p) - 0.79;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.09, vec3(0.54, 0.53, 0.43), vec3(0.35, 0.31, 0.37), vec3(1.08, 1.24, 1.30), vec3(1.00, 0.98, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
