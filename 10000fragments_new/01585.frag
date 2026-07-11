uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.96 + 0.28 * sin(t * 1.57)) + vec2(-0.26, -0.05) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	p = abs(p);
	p.x += sin(p.y * 2.14 + time * 1.51) * 0.24;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(1.54) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.46));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
