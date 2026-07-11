uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 34.18 - t * 1.17 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 12.09 - t * 1.17 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	p = rot2(time * -1.29) * p;
	p = rot2(p.y * 1.57 + time * 0.27) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(0.43) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.10));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
