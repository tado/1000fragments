uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.46 * jf)) * 0.44;
        xs += sin(length(p - im) * 76.72 - t * 12.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.51 - t * 5.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.56 * p.y + time * 1.35); p.y += 0.46 / wf * cos(wf * 3.39 * p.x + time * 0.86); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.57 + time * 0.21, vec3(0.57, 0.50, 0.40), vec3(0.39, 0.35, 0.37), vec3(1.09, 1.18, 0.95), vec3(0.81, 0.95, 0.82));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
