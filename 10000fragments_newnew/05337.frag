uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.47 + 0.29 * sin(t * 0.83)) + vec2(-0.38, -0.23) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 26.8) + 0.5) / 26.8;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.67;
	{ p = vec2(atan(p.y, p.x) * 2.54, length(p) * 5.04 - time * 0.45); }
	p = rot2(time * 0.75) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.56), field(p, time, 1.12));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
