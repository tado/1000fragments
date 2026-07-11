uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.01 + t * 1.11 + ph) + sin(p.y * 17.95 - t * 2.11 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.22, vec3(0.54, 0.41, 0.52), vec3(0.42, 0.34, 0.38), vec3(0.74, 0.89, 0.72), vec3(0.17, 0.35, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
