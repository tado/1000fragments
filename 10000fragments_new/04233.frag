uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.37 + t * 2.42 + ph) * 0.7;
    float wb = sin(p.y * 14.93 - t * 1.38 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.59;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.92, 0.84) * sin(length(p) * 3.22 - time * 2.33) * 0.21;
	p = rot2(length(p) * 2.02 + time * 1.30) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.18, 0.02), vec3(0.99, 0.54, 0.87), d);
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
