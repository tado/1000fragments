uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.35 - t * 1.68;
    v = sin(floor(lv * 4.7) / 4.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.10, 0.34), vec3(0.78, 0.95, 0.90), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
