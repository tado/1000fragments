uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.53 + sin(p.y * 1.73 + t * 4.87) * 1.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.01, vec3(0.57, 0.54, 0.50), vec3(0.44, 0.46, 0.37), vec3(0.77, 0.81, 0.86), vec3(0.72, 0.67, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
