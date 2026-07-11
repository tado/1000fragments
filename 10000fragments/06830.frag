uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.44, t * 1.75 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	p = fract(p * 1.97) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(0.34) * p; }
	p = rot2(time * -0.24) * p;
	p += vec2(-0.98, 0.55) * sin(length(p) * 2.75 - time * 1.34) * 0.39;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.18, 0.05), vec3(0.55, 0.72, 0.75), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
