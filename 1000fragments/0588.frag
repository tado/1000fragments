uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.59 + sr * 8.99 - t * 4.57 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.56 * jf)) * 0.40;
        xs += sin(length(p - im) * 165.78 - t * 7.68 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	p *= 2.40;
	p += vec2(-0.89, -0.93) * sin(length(p) * 4.55 - time * 1.32) * 0.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.00 + time * 0.04, vec3(0.44, 0.55, 0.57), vec3(0.34, 0.46, 0.42), vec3(0.94, 1.18, 0.97), vec3(0.68, 0.65, 0.25));
	col = mod(col * 2.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
