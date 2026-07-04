uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.32 - t * 0.51;
    v = sin(floor(lv * 2.4) / 2.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.09, 0.50, 1.24) + vec3(0.21, 0.02, 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
