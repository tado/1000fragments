uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.86 + 0.11 * sin(t * 1.43)) + vec2(-0.59, 0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	p = rot2(length(p) * 1.18 + time * 0.44) * p;
	p = (floor(p * 13.2) + 0.5) / 13.2;
	p = rot2(0.32) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.37, 0.51), vec3(0.75, 0.68, 0.79), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
