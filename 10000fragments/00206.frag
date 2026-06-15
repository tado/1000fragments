uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.32 - t * 5.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.25, vec3(0.47, 0.40, 0.45), vec3(0.42, 0.31, 0.39), vec3(1.19, 0.74, 1.29), vec3(0.80, 0.59, 0.10));
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
