uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.13 + t * 3.50 + ph) + sin(p.y * 14.75 - t * 2.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	p = abs(p) - 0.57;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.08, vec3(0.41, 0.45, 0.59), vec3(0.44, 0.39, 0.32), vec3(0.80, 0.80, 0.82), vec3(0.12, 0.80, 0.88));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
