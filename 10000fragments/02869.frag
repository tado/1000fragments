uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.85 + t * 4.63 + ph) + sin(p.y * 17.30 - t * 3.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.22) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.16, vec3(0.55, 0.51, 0.52), vec3(0.45, 0.36, 0.44), vec3(0.83, 1.21, 0.75), vec3(0.55, 0.42, 0.75));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
