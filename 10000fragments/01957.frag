uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.45 + sin(p.y * 3.32 + t * 3.02) * 4.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.15, vec3(0.59, 0.59, 0.45), vec3(0.49, 0.31, 0.39), vec3(0.93, 0.82, 0.85), vec3(0.05, 0.56, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
