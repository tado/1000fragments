uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.41 - t * 1.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.02, vec3(0.56, 0.56, 0.41), vec3(0.31, 0.48, 0.40), vec3(1.05, 0.75, 0.96), vec3(0.92, 0.15, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
