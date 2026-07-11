uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.13 * jf)) * 0.88;
        xs += sin(length(p - im) * 173.89 - t * 13.19 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p *= 2.33;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.03, vec3(0.50, 0.50, 0.57), vec3(0.38, 0.50, 0.43), vec3(1.06, 1.39, 1.11), vec3(0.28, 0.94, 0.74));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
