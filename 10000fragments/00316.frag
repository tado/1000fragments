uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.51 + t * 5.32 + ph) + sin(p.y * 7.76 - t * 4.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p += vec2(-0.87, 0.77) * sin(length(p) * 5.49 - time * 0.54) * 0.17;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(1.05) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.94, length(p) * 3.06 - time * 0.17); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.21, 0.27), vec3(0.83, 0.87, 0.60), d);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
