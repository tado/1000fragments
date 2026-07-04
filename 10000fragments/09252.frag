uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.65 - t * 1.04;
    v = sin(floor(lv * 4.2) / 4.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	p = rot2(p.y * 3.56 + time * 0.45) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.23; p = rot2(1.68) * p; }
	p = rot2(length(p) * -3.56 + time * 0.95) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.09, 0.41), vec3(0.59, 0.61, 0.89), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
