uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.66 + 0.34 * sin(t * 0.86)) + vec2(-0.86, -0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 18.7) + 0.5) / 18.7;
	{ p = vec2(atan(p.y, p.x) * 1.61, length(p) * 2.36 - time * 0.23); }
	p = rot2(time * -0.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.15, 1.08, 1.40) + vec3(0.28, 0.16, 0.14);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.41 + time * 4.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
