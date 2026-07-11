uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.61 - t * 6.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 19.0) + 0.5) / 19.0;
	p += vec2(0.25, -0.35) * sin(length(p) * 2.01 - time * 1.18) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.01, vec3(0.54, 0.58, 0.45), vec3(0.43, 0.48, 0.33), vec3(0.79, 0.91, 1.11), vec3(0.74, 0.43, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
