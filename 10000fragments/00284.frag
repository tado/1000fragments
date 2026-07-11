uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.94 + t * 4.35 + ph) + sin(p.y * 2.05 - t * 2.39 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.29, vec3(0.42, 0.41, 0.40), vec3(0.40, 0.33, 0.33), vec3(0.91, 1.26, 0.80), vec3(0.23, 0.64, 0.21));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
