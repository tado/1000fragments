uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.15 + sin(p.y * 5.69 + t * 1.65) * 4.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.03, vec3(0.48, 0.54, 0.48), vec3(0.30, 0.40, 0.37), vec3(0.81, 0.81, 0.89), vec3(0.75, 0.02, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
