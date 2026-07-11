uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.91 - t * 1.80;
    v = sin(floor(lv * 2.8) / 2.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, (time * 0.59), 0.0);
	vec3 col = palette(d * 0.77 + (time * 0.59) * 0.10, vec3(0.28, 0.31, 0.31), vec3(0.23, 0.28, 0.31), vec3(0.89, 0.58, 0.71), vec3(0.78, 0.28, 0.90));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 1.001, 0.911) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
