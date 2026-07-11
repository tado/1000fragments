uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.34; vec2 jc = vec2(0.18 + 0.3 * sin(t * 0.97 + ph), 0.59 + 0.3 * cos(t * 0.97 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.78) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	p = rot2(length(p) * 3.48 + time * 1.05) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
