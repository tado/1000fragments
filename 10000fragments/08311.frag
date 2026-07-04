uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.73 - t * 0.56;
    v = sin(floor(lv * 4.4) / 4.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.45));
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.10, vec3(0.57, 0.50, 0.46), vec3(0.40, 0.38, 0.42), vec3(1.20, 1.35, 0.92), vec3(0.26, 0.63, 0.02));
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
