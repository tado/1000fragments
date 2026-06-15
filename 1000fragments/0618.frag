uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.86 + sin(p.y * 4.22 + t * 4.51) * 3.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.06, vec3(0.55, 0.54, 0.44), vec3(0.50, 0.41, 0.32), vec3(0.99, 0.78, 0.98), vec3(0.16, 0.25, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
