uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.06 + sin(p.y * 3.23 + t * 5.90) * 3.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.19, vec3(0.48, 0.52, 0.59), vec3(0.48, 0.44, 0.40), vec3(1.12, 0.88, 1.02), vec3(0.83, 0.21, 0.75));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
