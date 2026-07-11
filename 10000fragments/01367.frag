uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.49 + t * 4.46 + ph) + sin(p.y * 9.62 - t * 4.46 + ph)
        + sin((p.x + p.y) * 5.62 + t * 4.46 + ph) + sin(length(p) * 10.81 - t * 4.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p = rot2(p.y * 3.51 + time * 0.87) * p;
	p = abs(p) - 0.57;
	p += vec2(-0.96, -0.98) * sin(length(p) * 5.41 - time * 0.62) * 0.38;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(0.34) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.81));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
