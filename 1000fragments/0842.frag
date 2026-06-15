uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.44 + t * 2.79 + ph) + sin(p.y * 14.13 - t * 4.10 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.06, vec3(0.56, 0.58, 0.58), vec3(0.39, 0.32, 0.44), vec3(1.02, 0.70, 1.03), vec3(0.68, 0.37, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
